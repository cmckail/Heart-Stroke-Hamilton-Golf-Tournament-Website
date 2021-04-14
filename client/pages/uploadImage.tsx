import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl";
import React from "react";

export default function uploadImage() {
  return (
    <form
      action="/api/images/upload"
      method="post"
      encType="multipart/form-data"
    >
      <input type="file" name="photo" accept="image/*" />
      <input type="submit" value="Submit" />
    </form>
  );
}
