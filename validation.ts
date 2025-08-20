import Joi from "joi";

export const labelSchema = Joi.object({
    id: Joi.string().min(1).required(),
    name: Joi.string().trim().min(2).max(30).required(),
    // allow named colors OR hex (#RGB / #RRGGBB / #RRGGBBAA)
    color: Joi.string()
        .pattern(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$|^[a-zA-Z]+$/)
        .required(),
});

export const issueSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().allow("").max(2000),
    labels: Joi.array().items(Joi.string()).min(1).max(10).required(),
});

export function validate<T>(schema: Joi.ObjectSchema, data: T) {
    const { error, value } = schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });

    const errors: Record<string, string> = {};
    if (error) {
        for (const d of error.details) {
            errors[d.path.join(".")] = d.message;
        }
    }
    return { value: value as T, errors, isValid: !error };
}