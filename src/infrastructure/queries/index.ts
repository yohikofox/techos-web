import { createPostStats } from "@queries/createPostStats";
import { createWebPushSubscription } from "@queries/createWebPushSubscription";
import { deleteWebPushSubscription } from "@queries/deleteWebPushSubscription";
import { getHeaderData } from "@queries/getHeaderData";
import { getHomeData } from "@queries/getHomeData";
import { getMicroPostDetails } from "@queries/getMicroPostDetails";
import { getMicroPostList } from "@queries/getMicroPostList";
import { getOfflinePageData } from "@queries/getOfflinePageData";
import { getPostDetails } from "@queries/getPostDetails";
import { getPostList } from "@queries/getPostList";
import { getPostStats } from "@queries/getPostStats";
import { getTagInfos } from "@queries/getTagInfos";
import { getTagPostList } from "@queries/getTagPostList";
import { getWebPushNotification } from "@queries/getWebPushNotification";
import { getWebPushSubscriptionList } from "@queries/getWebPushSubscriptionList";
import { updatePostStats } from "@queries/updatePostStats";

const exportable = {
  getWebPushSubscriptionList,
  getWebPushNotification,
  deleteWebPushSubscription,
  getOfflinePageData,
  getPostDetails,
  getPostList,
  getMicroPostList,
  getMicroPostDetails,
  getHomeData,
  getHeaderData,
  getPostStats,
  getTagPostList,
  getTagInfos,
  createWebPushSubscription,
  createPostStats,
  updatePostStats,
};

export default exportable;
