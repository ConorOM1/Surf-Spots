export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Surf Spots",
      };
      return h.view("about-view", viewData);
    },
  },
};
