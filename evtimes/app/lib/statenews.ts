export type StateNewsItem = {
  state: string;
  slug: string;
  update: string;
  cities: Array<{
    city: string;
    title: string;
    summary: string;
  }>;
};

export const stateNews: StateNewsItem[] = [
  {
    state: "Rajasthan",
    slug: "rajasthan",
    update: "4 fresh updates",
    cities: [
      {
        city: "Jaipur",
        title: "Jaipur adds 120 new public EV charging points across metro corridors",
        summary:
          "The city transport unit has expanded fast-charging availability near key stations to reduce wait times for cabs and private EV users.",
      },
      {
        city: "Kota",
        title: "Municipal buses begin pilot with electric feeder routes",
        summary:
          "Kota rolled out short-loop electric routes around high-density neighborhoods to evaluate operational savings in summer conditions.",
      },
    ],
  },
  {
    state: "Maharashtra",
    slug: "maharashtra",
    update: "3 fresh updates",
    cities: [
      {
        city: "Mumbai",
        title: "New parking policy offers discounted slots for EV owners in CBD zones",
        summary:
          "Authorities announced incentive parking slabs for EV users near commercial districts to encourage weekday electrified commuting.",
      },
      {
        city: "Pune",
        title: "Industrial corridor gets dedicated DC fast charging network",
        summary:
          "A multi-operator deployment has gone live on major freight stretches to support electric delivery fleets and light commercial EVs.",
      },
    ],
  },
  {
    state: "Gujarat",
    slug: "gujarat",
    update: "2 fresh updates",
    cities: [
      {
        city: "Ahmedabad",
        title: "City tests smart tariff windows for off-peak EV charging",
        summary:
          "Pilot users are seeing lower rates during late-night hours as utilities test demand-shifting for residential EV charging loads.",
      },
      {
        city: "Surat",
        title: "EV auto-rickshaw financing scheme expands to 1,500 drivers",
        summary:
          "A public-private program widened access to low-interest loans aimed at replacing aging CNG fleets with electric three-wheelers.",
      },
    ],
  },
];

export function getStateBySlug(slug: string) {
  return stateNews.find((item) => item.slug === slug);
}
