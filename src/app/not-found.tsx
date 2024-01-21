import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    <main>
      <section>
        <Image
          width={680}
          height={500}
          style={{ height: "auto" }}
          alt="white wooden table with green and black wall decor"
          src="https://images.ctfassets.net/tddme9p4n2wr/5r9tm0iqpWqzppViDQzeEa/ddb3c421e74ebf12e10219bb63e159d7/4a7K9tI_XFs?fm=webp&w=1080"
        />
        <h1>Oh no! That's a 4-oh-4!</h1>
        <p
          style={{
            marginBottom: "20px",
          }}
        >
          We were not able to find the page you tried to navigate to. Use the
          link below to navigate back to the home page.
        </p>
        <Link style={{ textDecoration: "underline" }} href="/">
          Take me home
        </Link>
      </section>
    </main>
  );
}
