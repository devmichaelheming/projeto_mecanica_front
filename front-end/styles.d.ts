/* istanbul ignore file */
/* eslint @typescript-eslint/no-empty-interface: "off" */
import 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme, { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
