/*
 * Validates the body of PATCH /api/admin/papers/[id].
 *
 * Previously this route passed the raw request body straight
 * into savePaperUpdates() with only a shallow `typeof === "object"`
 * check per group. That meant a client could send e.g.
 * `taxonomy.tags: "not an array"` and it would be written
 * straight into the JSON file on disk, silently corrupting the
 * locked-schema shape for that record (display code elsewhere
 * guards with Array.isArray(), so it wouldn't crash — it would
 * just quietly lose the tags next time the file was read).
 *
 * This validates every field against its schema type/length,
 * strips unknown keys instead of trusting the caller, and
 * returns a clean, minimal update object.
 */

const LIMITS = {
  title: 500,
  category: 200,
  subcategory: 200,
  summary: 4000,
  site: 200,
  tag: 100,
  keyword: 100,
  socialCaption: 600,
};

function isNonEmptyString(value, max) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= max
  );
}

function isStringArray(value, itemMax, maxItems) {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    value.every(
      (item) => typeof item === "string" && item.length <= itemMax
    )
  );
}

export function validatePaperUpdate(body) {
  const errors = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, errors: ["Request body must be an object."] };
  }

  const { action, bibliographic, content, taxonomy, outreach, ...rest } = body;

  const extraKeys = Object.keys(rest);
  if (extraKeys.length > 0) {
    errors.push(`Unknown top-level field(s): ${extraKeys.join(", ")}`);
  }

  if (action !== "approve" && action !== "edit") {
    errors.push('"action" must be "approve" or "edit".');
  }

  const cleaned = { action };

  if (bibliographic !== undefined) {
    if (typeof bibliographic !== "object" || bibliographic === null) {
      errors.push('"bibliographic" must be an object.');
    } else {
      const { title, ...extra } = bibliographic;
      if (Object.keys(extra).length > 0) {
        errors.push(
          `Unknown bibliographic field(s): ${Object.keys(extra).join(", ")}`
        );
      }
      if (title !== undefined) {
        if (!isNonEmptyString(title, LIMITS.title)) {
          errors.push(`"bibliographic.title" must be 1-${LIMITS.title} characters.`);
        } else {
          cleaned.bibliographic = { title: title.trim() };
        }
      }
    }
  }

  if (taxonomy !== undefined) {
    if (typeof taxonomy !== "object" || taxonomy === null) {
      errors.push('"taxonomy" must be an object.');
    } else {
      const { category, subcategory, tags, ...extra } = taxonomy;
      if (Object.keys(extra).length > 0) {
        errors.push(
          `Unknown taxonomy field(s): ${Object.keys(extra).join(", ")}`
        );
      }

      const cleanTaxonomy = {};

      if (category !== undefined) {
        if (!isNonEmptyString(category, LIMITS.category)) {
          errors.push(`"taxonomy.category" must be 1-${LIMITS.category} characters.`);
        } else {
          cleanTaxonomy.category = category.trim();
        }
      }

      if (subcategory !== undefined) {
        // Empty string means "the reviewer cleared this field" -
        // treat it the same as an explicit null rather than
        // rejecting it, since most records start with no
        // subcategory at all and the form can't distinguish
        // "untouched empty" from "explicitly cleared".
        const normalizedSubcategory =
          subcategory === "" ? null : subcategory;

        if (
          normalizedSubcategory !== null &&
          !isNonEmptyString(normalizedSubcategory, LIMITS.subcategory)
        ) {
          errors.push(
            `"taxonomy.subcategory" must be null, empty, or 1-${LIMITS.subcategory} characters.`
          );
        } else {
          cleanTaxonomy.subcategory =
            normalizedSubcategory === null
              ? null
              : normalizedSubcategory.trim();
        }
      }

      if (tags !== undefined) {
        if (!isStringArray(tags, LIMITS.tag, 30)) {
          errors.push(
            `"taxonomy.tags" must be an array of up to 30 strings, each <= ${LIMITS.tag} characters.`
          );
        } else {
          cleanTaxonomy.tags = tags.map((tag) => tag.trim()).filter(Boolean);
        }
      }

      if (Object.keys(cleanTaxonomy).length > 0) {
        cleaned.taxonomy = cleanTaxonomy;
      }
    }
  }

  if (content !== undefined) {
    if (typeof content !== "object" || content === null) {
      errors.push('"content" must be an object.');
    } else {
      const { summary, research_sites: researchSites, ...extra } = content;
      if (Object.keys(extra).length > 0) {
        errors.push(
          `Unknown content field(s): ${Object.keys(extra).join(", ")}`
        );
      }

      const cleanContent = {};

      if (summary !== undefined) {
        if (!isNonEmptyString(summary, LIMITS.summary)) {
          errors.push(`"content.summary" must be 1-${LIMITS.summary} characters.`);
        } else {
          cleanContent.summary = summary.trim();
        }
      }

      if (researchSites !== undefined) {
        if (!isStringArray(researchSites, LIMITS.site, 50)) {
          errors.push(
            `"content.research_sites" must be an array of up to 50 strings, each <= ${LIMITS.site} characters.`
          );
        } else {
          cleanContent.research_sites = researchSites
            .map((site) => site.trim())
            .filter(Boolean);
        }
      }

      if (Object.keys(cleanContent).length > 0) {
        cleaned.content = cleanContent;
      }
    }
  }

  if (outreach !== undefined) {
    if (typeof outreach !== "object" || outreach === null) {
      errors.push('"outreach" must be an object.');
    } else {
      const { highlight, social_caption: socialCaption, ...extra } = outreach;
      if (Object.keys(extra).length > 0) {
        errors.push(
          `Unknown outreach field(s): ${Object.keys(extra).join(", ")}`
        );
      }

      const cleanOutreach = {};

      if (highlight !== undefined) {
        if (typeof highlight !== "boolean") {
          errors.push('"outreach.highlight" must be a boolean.');
        } else {
          cleanOutreach.highlight = highlight;
        }
      }

      if (socialCaption !== undefined) {
        if (
          socialCaption !== null &&
          !isNonEmptyString(socialCaption, LIMITS.socialCaption)
        ) {
          errors.push(
            `"outreach.social_caption" must be null or 1-${LIMITS.socialCaption} characters.`
          );
        } else {
          cleanOutreach.social_caption =
            socialCaption === null ? null : socialCaption.trim();
        }
      }

      if (Object.keys(cleanOutreach).length > 0) {
        cleaned.outreach = cleanOutreach;
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, cleaned };
}
