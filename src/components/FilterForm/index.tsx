import { Button, Divider, MenuItem } from "@mui/material";
import {
  ErrorText,
  StyledFormControl,
  StyledFormLabel,
} from "../ui/custom-mui-style";
import {
  filterFormControls,
  filterFormValidationSchema,
  getFilterFormInitialValues,
  handleFilterFormSubmit,
  validateFilterApplyButton,
} from "@/utils/formUtility";

import CommonFormElement from "../CommonFormElement";
import { FILTER_FORM } from "@/types";
import { Formik } from "formik";
import React from "react";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

type FilterFormProps = {
  closeMenu?: () => void;
};
const FilterForm = React.memo(({ closeMenu }: FilterFormProps) => {
  const { filterFormData, updateFilterData } = useTaskManagerContext();
  return (
    <div className="sm:border sm:rounded-md sm:shadow-md sm:h-fit sm:py-5 sm:px-2 sm:shrink-0 sm:sticky sm:top-28 bg-[var(--color-task-list)] border-[var(--color-task-list)]">
      <Formik
        initialValues={getFilterFormInitialValues(filterFormData)}
        enableReinitialize={true}
        validationSchema={filterFormValidationSchema}
        onSubmit={(values, formikHelpers) =>
          handleFilterFormSubmit(
            values,
            formikHelpers,
            updateFilterData,
            closeMenu
          )
        }
      >
        {({ values, errors, handleSubmit, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {filterFormControls.map((formControl, index) => (
              <MenuItem
                key={formControl.name}
                sx={{
                  "&.MuiMenuItem-root:hover ": {
                    backgroundColor: "inherit",
                  },
                  ":hover": {
                    backgroundColor: "none",
                  },
                  ":active": {
                    backgroundColor: "none",
                  },
                  ":focus": {
                    backgroundColor: "none",
                  },
                }}
              >
                <StyledFormControl key={formControl.name}>
                  <StyledFormLabel htmlFor={formControl.name}>
                    {formControl.label}
                  </StyledFormLabel>
                  <CommonFormElement currentItem={formControl} />
                  {touched[formControl.name as keyof FILTER_FORM] &&
                    errors[formControl.name as keyof FILTER_FORM] && (
                      <ErrorText variant="body2">
                        {errors[formControl.name as keyof FILTER_FORM]}
                      </ErrorText>
                    )}
                  <Divider />
                </StyledFormControl>
                {filterFormControls.length !== index + 1 && <Divider />}
              </MenuItem>
            ))}
            <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                disabled={isSubmitting || validateFilterApplyButton(values)}
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: `var(--color-text-primary)`,
                  color: `var(--color-bg)`,
                  ":disabled": {
                    backgroundColor: "#CECECE",
                  },
                }}
              >
                APPLY
              </Button>
            </MenuItem>
          </form>
        )}
      </Formik>
    </div>
  );
});
FilterForm.displayName = "Filter Form";

export default FilterForm;
