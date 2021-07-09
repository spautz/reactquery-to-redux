export interface ReactQueryToReduxOptions {
  /**
   * Controls whether updates to React Query's state will flow to Redux.
   *
   * This should generally remain on in order for reactquery-to-redux to work
   */
  readEnabled: boolean;
  /**
   * Controls whether changes to the Redux state will flow back to React Query.
   * You probably do not need or want this option.
   */
  writeEnabled: boolean;
  /**
   * Controls whether Redux receives the full, raw React Query state or a dehydrated version of it.
   */
  isDehydrated: boolean;
}

const defaultOptions: Readonly<ReactQueryToReduxOptions> = {
  readEnabled: true,
  writeEnabled: false,
  isDehydrated: false,
};

/**
 * `options` is just a simple singleton for holding these values.
 * Setting props on `<SyncReactQueryToRedux />` is the preferred way to set them,
 * but you can mutate this object directly if desired.
 *
 * <SyncReactQueryToRedux isDehydrated />
 * <SyncReactQueryToRedux writeEnabled={false} />
 */
const options = { ...defaultOptions };

export { defaultOptions, options };
