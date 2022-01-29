/* eslint-disable */
export default {
    create(mutationType, cacheKey, getValue) {
      return (store) => {
        store.subscribe((mutation, state) => {
          if (mutation.type === mutationType) {
            localStorage.setItem(cacheKey, JSON.stringify(getValue(state)));
          }
        });
      };
    },
  };
  