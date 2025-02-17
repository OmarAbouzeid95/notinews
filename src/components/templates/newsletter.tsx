import { Font, Head, Html } from "@react-email/components";
import { CategoryResult } from "@/types/category";

type NewsletterArgs = {
  name: string;
  date: string;
  email: string;
  link: string;
  articles: CategoryResult[];
};

export default function NewsletterTemplate({
  name,
  date,
  link,
  articles,
}: NewsletterArgs) {
  const styles = {
    emailBody: {
      maxWidth: "32rem",
      margin: "auto",
      backgroundColor: "#D1D5DB",
      padding: "0.5rem",
      textDecoration: "none",
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "1.5rem",
    },
    greeting: {
      marginBottom: "1.5rem",
    },
    articlesContainer: {
      padding: "1.5rem auto",
      marginTop: "1.5rem",
    },
    articleWrapper: {
      display: "block",
      padding: "1.5rem auto",
      marginBottom: "1.5rem",
      textDecoration: "none",
      color: "black",
    },
    articleImageWrapper: {
      Position: "relative",
      width: "100%",
      height: "11rem",
      overflow: "hidden",
      borderRadius: "1.25rem",
    },
    articleContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0.75rem 0",
    },
    pill: {
      position: "absolute" as "absolute",
      zIndex: 999,
      bottom: "5px",
      right: "5px",
      display: "block",
      backgroundColor: "#DADADA",
      TextTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "1px",
      fontSize: "10px",
      borderRadius: 999,
      height: "fit-content",
      width: "fit-content",
      padding: "0.5rem 1rem",
    },
  };

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Outfit"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <div style={{ ...styles.emailBody }}>
        <h1 style={{ ...styles.title }}>Notinews</h1>
        <p style={{ ...styles.greeting }}>Hi {name},</p>
        <p>
          Explore your personalized news for {date} and stay updated with what
          matters to you!
        </p>
        <div style={{ ...styles.articlesContainer }}>
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              style={{ ...styles.articleWrapper }}
              target="_blank">
              <div style={{ ...styles.articleImageWrapper }}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 5,
                  }}
                />
              </div>
              <div>
                <div style={{ ...styles.articleContent }}>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      padding: "0",
                      margin: "0 0.5rem 0 0",
                    }}>
                    {article.title}
                  </h2>
                </div>
                <p className="text-sm text-secondary mb-4">
                  {article.abstract.length > 200
                    ? `${article.abstract.slice(0, 200)}...`
                    : article.abstract}
                </p>
                <p style={{ fontSize: "0.875rem", color: "blueviolet" }}>
                  Read more
                </p>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <p>
            To view all your tailored news click on the following link:
            &#x1F447;
          </p>
          <a
            href={`${link}`}
            style={{
              display: "block",
              backgroundColor: "blueviolet",
              padding: "0.75rem 2rem",
              color: "white",
              borderRadius: "1rem",
              maxWidth: "10rem",
              textAlign: "center",
              margin: "1.5rem auto",
              textDecoration: "none",
            }}>
            Visit profile
          </a>
        </div>
      </div>
    </Html>
  );
}
