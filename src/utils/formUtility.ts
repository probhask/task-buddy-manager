import * as Yup from "yup";

import {
  FILTER_FORM,
  FORMIK_TASK_FORM,
  FORM_CONTROLS,
  PRIORITY,
  TASK_FORM,
} from "@/types";

import { FormikHelpers } from "formik";
import { getPriorityColor } from "./taskUtility";

export const formInitialState: TASK_FORM = {
  title: "",
  description: "",
  priority: "low",
  endDate: new Date(Date.now()),
  color: "var(--color-card-bg)",
};
export const filterFormInitialState: FILTER_FORM = {
  status: "all",
  priority: [],
  endDate: "default",
};
export const formInitialValues = (taskFormData: TASK_FORM) => {
  return {
    title: taskFormData?.title || "",
    description: taskFormData?.description || "",
    priority: taskFormData?.priority || "low",
    color: taskFormData?.color || "var(--color-card-bg)",
    endDate:
      formatDate(taskFormData?.endDate) || formatDate(new Date("01/03/2025")),
  };
};
export const getFilterFormInitialValues = (
  filterFormData: FILTER_FORM
): FILTER_FORM => {
  return {
    status: filterFormData?.status || "all",
    priority: filterFormData?.priority || [],
    endDate: filterFormData.endDate || "default",
  };
};

export const handleFormikFormSubmit = (
  values: FORMIK_TASK_FORM,
  formikHelpers: FormikHelpers<FORMIK_TASK_FORM>,
  handleFormSubmission: (data: TASK_FORM) => void,
  closeModal: () => void
) => {
  const { setSubmitting, resetForm } = formikHelpers;
  handleFormSubmission({
    ...values,
    endDate: new Date(values.endDate),
  });

  resetForm();
  setSubmitting(false);
  closeModal();
};

export const handleFilterFormSubmit = (
  values: FILTER_FORM,
  formikHelpers: FormikHelpers<FILTER_FORM>,
  handleFormSubmission: (data: FILTER_FORM) => void,
  closeMenu?: () => void
) => {
  const { setSubmitting, resetForm } = formikHelpers;
  handleFormSubmission(values);

  resetForm();
  setSubmitting(false);
  if (closeMenu) {
    closeMenu();
  }
};

export function formatDate(date: string | Date) {
  const parsedDate = new Date(date);
  const year = String(parsedDate.getFullYear());
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function validateFormSubmitButton(data: {
  title: string;
  description: string;
  priority: PRIORITY;
  endDate: string;
  color: string;
}): boolean {
  return !Object.values(data).every(
    (value) => value !== "" && value !== undefined && value !== null
  );
}
export function validateFilterApplyButton(data: FILTER_FORM): boolean {
  return !Object.values(data).every((value) =>
    value !== undefined && value !== null && Array.isArray(value)
      ? value.length > 0
      : true
  );
}

export const formValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "invalid priority")
    .required("Priority is required"),
  endDate: Yup.date().required("Deadline is required"),
  color: Yup.string()
    .oneOf(
      [
        "var(--color-card-bg)",
        "var(--color-card-red)",
        "var(--color-card-orange)",
        "var(--color-card-yellow)",
        "var(--color-card-pink)",
        "var(--color-card-green)",
      ],
      "Invalid color selected"
    )
    .required("Color is required"),
});
export const filterFormValidationSchema = Yup.object({
  status: Yup.string()
    .oneOf(["all", "pending", "completed", "overdue"], "invalid status")
    .required("Priority is required"),
  priority: Yup.array()
    .of(Yup.string().oneOf(["low", "medium", "high"], "Invalid priority"))
    .required("Priority is required")
    .min(1, "At least one priority must be selected"),
  endDate: Yup.string()
    .oneOf(["ascending", "descending", "default"], "invalid order")
    .required("Deadline is required"),
});

export const taskFormControls: FORM_CONTROLS[] = [
  {
    label: "Title",
    name: "title",
    placeholder: "Enter title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter description",
    type: "text",
    componentType: "input",
  },

  {
    label: "Priority",
    name: "priority",
    placeholder: "Choose priority",
    type: "radio",
    componentType: "radio",
    options: [
      { name: "Low", value: "low", color: getPriorityColor("low") },
      { name: "Medium", value: "medium", color: getPriorityColor("medium") },
      { name: "High", value: "high", color: getPriorityColor("high") },
    ],
  },

  {
    label: "Color",
    name: "color",
    placeholder: "Choose color",
    type: "select",
    componentType: "select",
    items: [
      { name: "default", value: "var(--color-card-bg)" },
      { name: "red", value: "var(--color-card-red)" },
      { name: "orange", value: "var(--color-card-orange)" },
      { name: "yellow", value: "var(--color-card-yellow)" },
      { name: "pink", value: "var(--color-card-pink)" },
      { name: "green", value: "var(--color-card-green)" },
    ],
  },
  {
    label: "Deadline",
    name: "endDate",
    placeholder: "select deadline",
    type: "date",
    componentType: "input",
  },
];

export const filterFormControls: FORM_CONTROLS[] = [
  {
    label: "Status",
    name: "status",
    placeholder: "choose status",
    type: "radio",
    componentType: "radio",
    options: [
      { name: "All", value: "all", color: "" },
      { name: "Pending", value: "pending", color: "" },
      {
        name: "Completed",
        value: "completed",
        color: "",
      },
      { name: "Overdue", value: "overdue", color: "" },
    ],
  },
  {
    label: "Priority",
    name: "priority",
    placeholder: "choose priorities",
    type: "checkbox",
    componentType: "checkbox",
    options: [
      { name: "Low", value: "low", color: getPriorityColor("low") },
      { name: "Medium", value: "medium", color: getPriorityColor("medium") },
      { name: "High", value: "high", color: getPriorityColor("high") },
    ],
  },
  {
    label: "End Date",
    name: "endDate",
    placeholder: "end date order",
    type: "select",
    componentType: "select",
    items: [
      { name: "default", value: "default" },
      { name: "ascending", value: "ascending" },
      { name: "descending", value: "descending" },
    ],
  },
];
