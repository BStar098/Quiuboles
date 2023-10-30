<<<<<<< Updated upstream
export const applyCustomCode = (externalCodeSetup) => {
	// call custom code api here
};
=======
import GroupFiltersCustom from "./components/GroupFiltersCustom";
export const applyCustomCode = externalCodeSetup => {
   externalCodeSetup.filterScreenApiHooks.setAfterFilterComponent(GroupFiltersCustom);
}
>>>>>>> Stashed changes
