export type Format =
  | typeof FORMAT_RAW
  | typeof FORMAT_SERIALIZABLE_V1
  | typeof FORMAT_DEHYDRATED
  | typeof FORMAT_KEYSONLY;

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
   * Determines the data format that gets sent to Redux from React Query for each query and mutation:
   * see the FORMAT_* constants for more information
   */
  format: Format;
}

/**
 * Indicates that React Query's queries and mutations data will be sent to Redux in their full, internal format.
 * Danger: this is not serializable, and includes a lot of internal data that is not part of the public API
 */
const FORMAT_RAW = 'FORMAT_RAW' as const;
/**
 * Indicates that React Query's queries and mutations data will be to Redux as reformatted, serializable records
 * which are less likely to break in the future. This includes a lot of internal data that is not part of React Query's
 * public API, but ReactQuery-to-Redux will try to keep its shape stable over time.
 */
const FORMAT_SERIALIZABLE_V1 = 'FORMAT_SERIALIZABLE_V1' as const;
/**
 * Indicates that React Query's queries and mutations data will be dehydrated before being sent to Redux.
 * Although not officially guaranteed to stay the same over time, this is the most minimal and likely
 * the most stable format.
 * See `react-query/hydration` for more information.
 */
const FORMAT_DEHYDRATED = 'FORMAT_DEHYDRATED' as const;
/**
 * Indicates that only the keys of React Query's queries and mutations will be sent to Redux
 */
const FORMAT_KEYSONLY = 'FORMAT_KEYSONLY' as const;

const defaultOptions: Readonly<ReactQueryToReduxOptions> = {
  readEnabled: true,
  writeEnabled: false,
  format: FORMAT_DEHYDRATED,
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
