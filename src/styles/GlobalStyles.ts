/* istanbul ignore file */
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    margin: 0;
    font-weight: 600;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .ant-modal-header{
    border-radius: 4px !important;
  }

  .ant-modal-content {
    border-radius: 4px !important;
  }

  /* .ant-tree-draggable-icon {
    display: none;
  } */

  /* Tree */
  .ant-tree-switcher {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-tree .ant-tree-treenode {
    padding: 0
  }

  .ant-tree-draggable-icon {
    display: none;
  }

   /* Card */
   .ant-card-bordered {
    border: 1px solid #CED4DA;
  }

  .ant-card-head {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .ant-card-head {
    border-bottom: 1px solid #CED4DA;
  }

  /* checkbox */
  .ant-checkbox-wrapper-checked {
    span {
      color: #000;
      font-weight: 600;
    }
  }

  .ant-radio-wrapper-checked {
    span {
      color: #000;
      font-weight: 600;
    }
  }

  // Divider
  .ant-divider-horizontal {
    margin: 16px 0
  }

  // Transfer
  .ant-transfer-list {
    width: 100%;
    height: 264px;
  }

  // Select
  .ant-select-multiple .ant-select-selection-item-content {
    color: #205DCA
  }

  .ant-select-multiple .ant-select-selection-item {
    border-radius: 4px;
    margin-inline-end: 8px;
  }

  .ant-select-multiple .ant-select-selector {
    padding: 6px 4px;
  }

  thead[class*='ant-table-thead'] th {
    background-color: #ebebeb;
    color: #262626;
  }
`;
