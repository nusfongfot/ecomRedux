import { useState } from "react";
import styles from "./styles.module.scss";
import { signOut } from "next-auth/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import slugify from "slugify";

export default function Item({ item, visible, index }) {
  const router = useRouter();
  const [show, setShow] = useState(visible);
  return (
    <li style={{ listStyle: "none" }}>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign Out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinus /> : <HiPlus />}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <li
              key={i}
              className={
                (router.query.q || "") == slugify(link.name, { lower: true })
                  ? styles.active
                  : ""
              }
            >
              <Link
                href={`${link.link}?tab=${i}&q=${slugify(link.name, {
                  lower: true,
                })}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
