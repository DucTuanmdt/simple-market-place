import clsx from "clsx";
import React from "react";
import { Avatar } from "rsuite";

function UserInfo({
  name,
  email,
  avataSrc,
  size = "md",
  className,
  infoClassName,
}) {
  return (
    <div className={clsx("d-flex align-items-center gap-2", className)}>
      <Avatar circle src={avataSrc} alt={name} size={size}></Avatar>
      <div className={infoClassName}>
        <p className="text-mute fw-500 m-0 text-14">{name}</p>
        <p className="text-12 m-0">{email}</p>
      </div>
    </div>
  );
}

export default UserInfo;
