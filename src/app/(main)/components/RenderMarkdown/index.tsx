import classNames from "classnames";
import { convert } from "html-to-text";
import md from "markdown-it";
import { IOC } from "R/src/infrastructure/container";
import ReplaceComponentHelper, {
  ComponentDefinition,
} from "R/src/infrastructure/helper/replaceComponents";

import { IConfigManager } from "@/infrastructure/adapter/configManager";
import highlightMarkdown from "@/infrastructure/helper/highlightMarkdown";

import WrappedMicroPostCard from "../../flux/MicroPostList/_parts/WrappedMicroPostCard";
import TextToSpeechButton from "../TextToSpeechButton";
import styles from "./render-markdown.module.scss";

export interface RenderMarkdownProps {
  content: string;
  className?: string;
  classNameCollection?: Record<string, Record<string, string>>;
}

export default async function RenderMarkdown({
  content,
  className,
  classNameCollection,
}: RenderMarkdownProps) {
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");
  const cmsEndpoint = await configManager.get("CMS_ENDPOINT");

  const m = md({
    html: true,
    highlight(str, lang) {
      return highlightMarkdown(str, lang);
    },
  });

  m.renderer.rules.image = function (tokens, idx, options, env, slf) {
    const token = tokens[idx];
    if (
      token !== undefined &&
      token.type === "image" &&
      token.attrs &&
      token.children
    ) {
      token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(
        token.children,
        options,
        env
      );
      if (token.attrs[token.attrIndex("src")][1].startsWith("http"))
        return slf.renderToken(tokens, idx, options);
      if (token.attrs[token.attrIndex("src")][1].startsWith("/uploads"))
        token.attrs[token.attrIndex("src")][1] =
          `${cmsEndpoint}${token.attrs[token.attrIndex("src")][1]}`;
      if (
        token.attrs[token.attrIndex("src")][1].startsWith(
          "data:image/png;base64,"
        )
      )
        return slf.renderToken(tokens, idx, options);

      token.attrSet("loading", "lazy");
      return slf.renderToken(tokens, idx, options);
    }
    return "";
  };
  const ctnt = m.render(content);

  const componentDefinitions = ReplaceComponentHelper.extractAndSplit(ctnt);

  const tts = convert(ctnt).replaceAll(">", "");

  return (
    <>
      {content !== undefined && (
        <div className={styles.speech}>
          <TextToSpeechButton
            identifier={""}
            className={styles.read__button}
            text={tts}
          />
        </div>
      )}

      {componentDefinitions.map((componentDefinition, index) => {
        if (typeof componentDefinition !== "string")
          return (
            <div key={index} className={styles.micro__post__wrapper}>
              {(componentDefinition satisfies ComponentDefinition[]).map(
                (cd, cdIndex) => {
                  switch (cd.resourceType) {
                    case "micro-post":
                      return (
                        <WrappedMicroPostCard
                          key={cdIndex}
                          slug={cd.value}
                          className={
                            classNameCollection &&
                            classNameCollection["micro-post"]
                          }
                        />
                      );
                    default:
                      return;
                  }
                }
              )}
            </div>
          );

        return (
          <div
            className={classNames(styles.content, className)}
            key={index}
            dangerouslySetInnerHTML={{ __html: componentDefinition }}
          />
        );
      })}
    </>
  );
}
