// return the admin_type from the session storage
export const getAdminType = () => {
  return sessionStorage.getItem("admin_type");
};

// remove the admin_type from the session storage
export const removeAdminType = () => {
  sessionStorage.removeItem("admin_type");
};

// set the admin_type from the session storage
export const setAdminType = (admin_type) => {
  sessionStorage.setItem("admin_type", admin_type);
};
