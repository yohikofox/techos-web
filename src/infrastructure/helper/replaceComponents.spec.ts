import { describe, expect,it } from 'vitest'

import ReplaceComponentHelper, { ComponentDefinition } from './replaceComponents';


describe('replaceComponents tests', () => {
  it('should regex match', () => {

    // given

    const str = "<!-- [[ micro-post|slug:comment-fonctionnent-les-middlewares-dans-next-app-router ]] -->";

    const expectedResourceType = "micro-post"
    const expectedParameter = "slug"
    const expectedValue = "comment-fonctionnent-les-middlewares-dans-next-app-router"

    // when

    const { resourceType, parameter, value, raw } = ReplaceComponentHelper.extract(str)[0]

    // then 
    expect(raw).toBe(str)
    expect(resourceType).toBe(expectedResourceType)
    expect(parameter).toBe(expectedParameter)
    expect(value).toBe(expectedValue)
  })

  it('should regex match in text bloc', () => {

    // given
    const toSeek = "<!-- [[ micro-post|slug:comment-fonctionnent-les-middlewares-dans-next-app-router ]] -->"
    const str = `Nisi qui eu sunt non laboris sint occaecat pariatur qui eiusmod eu. Aute aute elit reprehenderit magna ipsum elit quis tempor. Lorem elit dolor consequat quis velit. Magna sit non quis aliquip ullamco.${toSeek}Dolor Lorem dolore deserunt consectetur ex deserunt voluptate ad incididunt do. Laborum ad Lorem mollit magna aute ea incididunt. Est excepteur velit laborum culpa ut eiusmod anim officia ex aute. Enim nulla ea non culpa consequat consequat.`;

    const expectedResourceType = "micro-post"
    const expectedParameter = "slug"
    const expectedValue = "comment-fonctionnent-les-middlewares-dans-next-app-router"

    // when

    const { resourceType, parameter, value, raw } = ReplaceComponentHelper.extract(str)[0]

    // then 
    expect(raw).toBe(toSeek)
    expect(resourceType).toBe(expectedResourceType)
    expect(parameter).toBe(expectedParameter)
    expect(value).toBe(expectedValue)
  })


  it("should replaceAll components", () => {

    // given

    const toSeek = [
      {
        str: '<!-- [[ micro-post|slug:comment-fonctionnent-les-middlewares-dans-next-app-router ]] -->',
        expectedResourceType: "micro-post",
        expectedParameter: "slug",
        expectedValue: "comment-fonctionnent-les-middlewares-dans-next-app-router"
      },
      {
        str: '<!-- [[ micro-posey|slug:comment-fonctionnent-les-middlewares-dans-nuxt-app-router ]] -->',
        expectedResourceType: "micro-posey",
        expectedParameter: "slug",
        expectedValue: "comment-fonctionnent-les-middlewares-dans-nuxt-app-router"
      }
    ]

    const str = `Nisi qui eu sunt non laboris sint occaecat pariatur qui eiusmod eu. Aute aute elit reprehenderit magna ipsum elit quis tempor. Lorem elit dolor consequat quis velit. 
    Magna sit non quis aliquip ullamco.${toSeek[0].str}Dolor Lorem dolore deserunt consectetur ex deserunt voluptate ad incididunt do. Laborum ad Lorem mollit magna aute ea incididunt. Est excepteur velit laborum culpa ut eiusmod anim officia ex aute. Enim nulla ea
    ${toSeek[1].str}non culpa consequat consequat.`;

    // when

    const results = ReplaceComponentHelper.extract(str)

    // then 


    let count = 0
    for (const { resourceType, parameter, value, raw } of results) {
      const expected = toSeek[count]
      // then 
      expect(raw).toBe(expected.str)
      expect(resourceType).toBe(expected.expectedResourceType)
      expect(parameter).toBe(expected.expectedParameter)
      expect(value).toBe(expected.expectedValue)
      count++
    }
  })

  it("should replaceAll components and split", () => {
    const original = `
<p>Voici le plan de ce qu'il faudra faire pour effectuer cette action :</p>
<ol>
<li>intercepter les requêtes qui doivent être couvertes par une authentification</li>
<li>consulter l'entrepôt de sessions afin de demander une connexion si besoin</li>
</ol>
<h2>Intercepter les requêtes qui doivent être couvertes par une authentification</h2>
<h3>Prérequis</h3>
<!-- [[ micro-post|slug:test-toto ]] -->
<ul>
<li>Séparer la logique de middlewares en plusieurs sous logiques</li>
</ul>
<p>Dans <code>Next-Auth</code>, afin de réaliser un signin ou un singout sans voir la mire Next-Auth, il faut avoit des cookies csrf-auth-token identiques entre le form de soumission et le cookie correspondant.</p>
<p>En HTTPS, il faut faire attention, ces cookies sont <code>secure</code>.</p>
<p>badges:</p>
<ul>
<li>Next-Auth 4.24.5</li>
</ul>`

    const res = ReplaceComponentHelper.extractAndSplit(original)
    expect((res[0] as string).replaceAll('\n', '')).toBe(`
<p>Voici le plan de ce qu'il faudra faire pour effectuer cette action :</p>
<ol>
<li>intercepter les requêtes qui doivent être couvertes par une authentification</li>
<li>consulter l'entrepôt de sessions afin de demander une connexion si besoin</li>
</ol>
<h2>Intercepter les requêtes qui doivent être couvertes par une authentification</h2>
<h3>Prérequis</h3>`.replaceAll('\n', '')
    )

    expect((res[1][0] as ComponentDefinition).raw).toBe('<!-- [[ micro-post|slug:test-toto ]] -->')
    expect((res[1][0] as ComponentDefinition).parameter).toBe('slug')
    expect((res[1][0] as ComponentDefinition).resourceType).toBe('micro-post')
    expect((res[1][0] as ComponentDefinition).value).toBe('test-toto')

    expect((res[2] as string).replaceAll('\n', '')).toBe(`
<ul>
<li>Séparer la logique de middlewares en plusieurs sous logiques</li>
</ul>
<p>Dans <code>Next-Auth</code>, afin de réaliser un signin ou un singout sans voir la mire Next-Auth, il faut avoit des cookies csrf-auth-token identiques entre le form de soumission et le cookie correspondant.</p>
<p>En HTTPS, il faut faire attention, ces cookies sont <code>secure</code>.</p>
<p>badges:</p>
<ul>
<li>Next-Auth 4.24.5</li>
</ul>`.replaceAll('\n', ''))
  })


  it("should replaceAll multiple components and split", () => {
    const expected = [
      {
        str: '<!-- [[ micro-post|slug:test-toto ]] -->',
        expectedResourceType: "micro-post",
        expectedParameter: "slug",
        expectedValue: "test-toto"
      },
      {
        str: '<!-- [[ micro-post|slug:test-tata ]] -->',
        expectedResourceType: "micro-post",
        expectedParameter: "slug",
        expectedValue: "test-tata"
      }
    ]
    const original = `
<p>Voici le plan de ce qu'il faudra faire pour effectuer cette action :</p>
<ol>
<li>intercepter les requêtes qui doivent être couvertes par une authentification</li>
<li>consulter l'entrepôt de sessions afin de demander une connexion si besoin</li>
</ol>
<h2>Intercepter les requêtes qui doivent être couvertes par une authentification</h2>
<h3>Prérequis</h3>
<!-- [[ micro-post|slug:test-toto ]] -->
<!-- [[ micro-post|slug:test-tata ]] -->
<ul>
<li>Séparer la logique de middlewares en plusieurs sous logiques</li>
</ul>
<p>Dans <code>Next-Auth</code>, afin de réaliser un signin ou un singout sans voir la mire Next-Auth, il faut avoit des cookies csrf-auth-token identiques entre le form de soumission et le cookie correspondant.</p>
<p>En HTTPS, il faut faire attention, ces cookies sont <code>secure</code>.</p>
<p>badges:</p>
<ul>
<li>Next-Auth 4.24.5</li>
</ul>`

    const res = ReplaceComponentHelper.extractAndSplit(original)
    expect((res[0] as string).replaceAll('\n', '')).toBe(`
<p>Voici le plan de ce qu'il faudra faire pour effectuer cette action :</p>
<ol>
<li>intercepter les requêtes qui doivent être couvertes par une authentification</li>
<li>consulter l'entrepôt de sessions afin de demander une connexion si besoin</li>
</ol>
<h2>Intercepter les requêtes qui doivent être couvertes par une authentification</h2>
<h3>Prérequis</h3>`.replaceAll('\n', '')
    )


    const components = res[1] as ComponentDefinition[]

    components.forEach((c, index) => {
      const e = expected[index]
      expect(c.raw).toBe(e.str)
      expect(c.resourceType).toBe(e.expectedResourceType)
      expect(c.parameter).toBe(e.expectedParameter)
      expect(c.value).toBe(e.expectedValue)
    })


    expect((res[2] as string).replaceAll('\n', '')).toBe(`
<ul>
<li>Séparer la logique de middlewares en plusieurs sous logiques</li>
</ul>
<p>Dans <code>Next-Auth</code>, afin de réaliser un signin ou un singout sans voir la mire Next-Auth, il faut avoit des cookies csrf-auth-token identiques entre le form de soumission et le cookie correspondant.</p>
<p>En HTTPS, il faut faire attention, ces cookies sont <code>secure</code>.</p>
<p>badges:</p>
<ul>
<li>Next-Auth 4.24.5</li>
</ul>`.replaceAll('\n', ''))
  })


})