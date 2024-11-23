import {
  ErrorText,
  StyledFormControl,
  StyledFormLabel,
} from "../ui/custom-mui-style";
import {
  formInitialValues,
  formValidationSchema,
  handleFormikFormSubmit,
  taskFormControls,
  validateFormSubmitButton,
} from "@/utils/formUtility";

import { Button } from "@mui/material";
import CommonFormElement from "../CommonFormElement";
import { Formik } from "formik";
import React from "react";
import { TASK_FORM } from "@/types";
import useTaskManagerContext from "@/hooks/useTaskManagerContext";

const TaskForm = React.memo(() => {
  const {
    taskFormData,
    addNewTask,
    editTask,
    closeModal,
    currentEditedTaskID,
  } = useTaskManagerContext();

  const handleFormSubmission = (data: TASK_FORM) => {
    if (currentEditedTaskID) {
      editTask(data, currentEditedTaskID);
    } else {
      addNewTask(data);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues(taskFormData)}
      validationSchema={formValidationSchema}
      onSubmit={(values, formikHelpers) =>
        handleFormikFormSubmit(
          values,
          formikHelpers,
          handleFormSubmission,
          closeModal
        )
      }
    >
      {({ values, errors, touched, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="w-full ">
          <div className="w-full grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {taskFormControls.map((formControl) => (
              <StyledFormControl key={formControl.name}>
                <StyledFormLabel htmlFor={formControl.name}>
                  {formControl.label}
                </StyledFormLabel>
                <CommonFormElement currentItem={formControl} />
                {touched[formControl.name as keyof TASK_FORM] &&
                  errors[formControl.name as keyof TASK_FORM] && (
                    <ErrorText variant="body2">
                      {errors[formControl.name as keyof TASK_FORM]}
                    </ErrorText>
                  )}
              </StyledFormControl>
            ))}
          </div>
          <Button
            fullWidth
            disabled={isSubmitting || validateFormSubmitButton(values)}
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: `var(--color-text-primary)`,
              marginTop: 5,
              color: `var(--color-bg)`,
              ":disabled": {
                backgroundColor: "#CECECE",
              },
            }}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
});
TaskForm.displayName = "TaskForm";
export default TaskForm;
