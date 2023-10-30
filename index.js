import GroupFiltersCustom from "./components/GroupFiltersCustom";
export const applyCustomCode = (externalCodeSetup) => {
  externalCodeSetup.filterScreenApiHooks.setAfterFilterComponent(
    GroupFiltersCustom
  );
};
