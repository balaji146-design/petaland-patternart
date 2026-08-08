import { motion } from "framer-motion";
import { FaHandSparkles, FaEye, FaBullseye, FaHeart } from "react-icons/fa";
import SEO from "../../components/common/SEO.jsx";

const whyChooseUs = [
  {
    icon: FaHandSparkles,
    title: "Hand-Crafted Artistry",
    description:
      "Each design is drawn freehand by skilled artists, ensuring every pattern is unique and precise.",
  },
  {
    icon: FaEye,
    title: "Attention to Detail",
    description:
      "From fine linework to bold motifs, we obsess over the smallest details that make a design unforgettable.",
  },
  {
    icon: FaBullseye,
    title: "Client-First Approach",
    description:
      "We listen closely to your vision and tailor every design to match your occasion and personality.",
  },
  {
    icon: FaHeart,
    title: "Passion for the Craft",
    description:
      "Henna is more than a service to us — it is a tradition we honor with every stroke.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function About() {
  return (
    <div className="w-full">
      <SEO
        title="About Us | Petaland Patternart"
        description="Discover the story, mission, and passion behind Petaland Patternart, a premium henna design studio dedicated to timeless artistry."
        keywords="about petaland patternart, henna artists, mehndi studio, bridal henna story"
      />

      <section className="relative overflow-hidden bg-coffee-brown py-24 sm:py-28">
        <div className="container-luxury relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-medium tracking-[0.35em] text-soft-gold"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-semibold text-cream sm:text-5xl"
          >
            About Petaland Patternart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-sm text-beige sm:text-base"
          >
            Where age-old henna traditions meet modern luxury, crafted stroke
            by stroke for your most treasured moments.
          </motion.p>
        </div>
      </section>

      <section className="container-luxury py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl shadow-luxury"
          >
            <img
              src="/assets/images/about-artist.jpg"
              alt="Petaland Patternart henna artist at work"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
              WHO WE ARE
            </p>
            <h2 className="mb-5 font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
              A Legacy of Elegant Henna Artistry
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-coffee-brown sm:text-base">
              Petaland Patternart was born from a love for intricate patterns
              and the timeless beauty of henna. What began as a passion
              project has grown into a trusted name for brides, families, and
              celebrations seeking artistry that feels both traditional and
              refined.
            </p>
            <p className="text-sm leading-relaxed text-coffee-brown sm:text-base">
              Every design we create is a reflection of the person wearing
              it — thoughtful, detailed, and made to last well beyond the
              celebration itself.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-beige/40 py-20">
        <div className="container-luxury grid gap-8 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-beige-dark bg-cream p-10 shadow-luxury"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
              <FaBullseye />
            </div>
            <h3 className="mb-3 font-serif text-2xl text-henna-brown">
              Our Mission
            </h3>
            <p className="text-sm leading-relaxed text-coffee-brown sm:text-base">
              To deliver premium, hand-crafted henna artistry that honors
              tradition while embracing modern elegance, making every client
              feel cherished and beautifully adorned.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl border border-beige-dark bg-cream p-10 shadow-luxury"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
              <FaEye />
            </div>
            <h3 className="mb-3 font-serif text-2xl text-henna-brown">
              Our Vision
            </h3>
            <p className="text-sm leading-relaxed text-coffee-brown sm:text-base">
              To become a globally recognized name in luxury henna artistry,
              known for elevating this timeless craft into an unforgettable,
              premium experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-luxury py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
            OUR PROMISE
          </p>
          <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
            Why Choose Petaland Patternart
          </h2>
          <div className="divider-luxury" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-beige-dark bg-cream p-8 text-center shadow-luxury transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
                  <Icon />
                </div>
                <h3 className="mb-2 font-serif text-lg text-henna-brown">
                  {item.title}
                </h3>
                <p className="text-sm text-coffee-brown">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default About;