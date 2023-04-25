export const mockPostResponse = (options: any = {}) => {
  const defaultResponse = {
    title: 'Testing Again',
    description: 'Testing create post request again',
    content:
      '<h2 class="text-3xl">Hi there,</h2><p>this is a&nb…ood work, boy! 👏&nbsp;<br>— Mom</p></blockquote>',
    category: 'Test',
    imageUrl: '',
  };

  const mergedOptions = Object.assign({}, defaultResponse, options);

  return mergedOptions;
};
