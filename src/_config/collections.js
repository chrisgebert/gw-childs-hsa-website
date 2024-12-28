export const getAllPosts = collection => {
    return collection.getFilteredByTag("post");
};