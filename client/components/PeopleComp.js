import React from "react";
import { UserContext } from "@/context";
import { useRouter } from "next/router";
import moment from "moment";
const PeopleComp = ({ people }) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  return (
    <div className="mt-4">
      {people.map((user) => (
        <div className="card" key={user._id}>
          <div className="d-flex align-items-center justify-content-between">
            <img
              src={user.image && user.image.url ? user.image.url : defaultImage}
              alt={user.name}
              height={50}
              width={50}
              style={{ borderRadius: "50%" }}
            />
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleComp;
