import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ allowRelative: false }),
        }),
        defineField({
          name: "tiktok",
          title: "TikTok URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ allowRelative: false }),
        }),
        defineField({
          name: "youtube",
          title: "YouTube URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ allowRelative: false }),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) =>
            Rule.required().email().error("Enter a valid email address"),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "navItems",
      title: "Navbar Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              description: "Example: #home",
              validation: (Rule) =>
                Rule.required().regex(/^#/, {
                  name: "anchor hash",
                  invert: false,
                }),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "storySections",
      title: "Story Rail Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Section ID",
              type: "string",
              description: "Must match section id in the website, e.g. about",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "id",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titleTop",
          title: "Title Top",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titleBottom",
          title: "Title Bottom",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visuals",
      title: "Visual Assets",
      type: "object",
      fields: [
        defineField({
          name: "logoUrl",
          title: "Logo URL (optional)",
          type: "url",
          description: "Leave empty to use the built-in logo image.",
        }),
        defineField({
          name: "heroBgUrl",
          title: "Hero Background URL (optional)",
          type: "url",
          description: "Leave empty to use the built-in hero background.",
        }),
        defineField({
          name: "communityBgUrl",
          title: "Community Background URL (optional)",
          type: "url",
          description: "Leave empty to use the built-in community background.",
        }),
      ],
    }),
    defineField({
      name: "effects",
      title: "Motion & FX Controls",
      type: "object",
      fields: [
        defineField({
          name: "enableIntroLoader",
          title: "Enable Intro Loader",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "enableAmbientOrbs",
          title: "Enable Ambient Orbs",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showSectionTransitions",
          title: "Show Section Transition Bars",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "loaderSpeed",
          title: "Loader Speed",
          type: "string",
          options: {
            list: [
              { title: "Normal", value: "normal" },
              { title: "Slow", value: "slow" },
              { title: "Cinematic", value: "cinematic" },
            ],
            layout: "radio",
          },
          initialValue: "slow",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "moodShiftStrength",
          title: "Mood Shift Strength",
          type: "number",
          description: "0 = off, 1 = strongest section mood transitions.",
          initialValue: 0.45,
          validation: (Rule) => Rule.min(0).max(1),
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 3,
          description: "Use line breaks where needed.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
          validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "n",
                  title: "Value",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "l",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "n", subtitle: "l" },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whatWeDo",
      title: "What We Do Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Flame", value: "flame" },
                      { title: "Trophy", value: "trophy" },
                      { title: "Trending Up", value: "trendingUp" },
                      { title: "Sparkles", value: "sparkles" },
                      { title: "Film", value: "film" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "desc",
                  title: "Description",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "icon" },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "community",
      title: "Community Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "pills",
          title: "Pills",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global website content",
      };
    },
  },
});
