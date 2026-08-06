import dayjs from "dayjs";
import React from "react";
import { navLinks ,navIcons} from "#constants";
function Navbar() {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold"> Roshan's Portfolio</p>
        <ul>
            {navLinks.map((link) => (
                <li key={link.id}>
                   <p>{link.name}</p> 
                </li>
            ))}
        </ul>
      </div>
      <div>
        <ul>
            {
                navIcons.map(({id,img})=>(
                    <li key={id} >
                        <img src={img} alt="" />
                    </li>
                ))
            }
        </ul>

        <time>{dayjs().format("ddd MMM D hh:mm A")}</time>
      </div>
    </nav>
  );
}

export default Navbar;
