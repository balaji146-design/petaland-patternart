import { Helmet } from "react-helmet-async";

function SEO({
  title = "Petaland Patternart | Premium Henna Design Studio",
  description = "Petaland Patternart offers premium, hand-crafted henna designs for weddings, festivals, and celebrations. Book your artist today.",
  keywords = "henna, mehndi, bridal henna, petaland patternart, henna booking, mehndi artist",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default SEO;