import { z } from 'zod';

const say = console.info;

const NumberSchemaWithDefaultValue = z.object({
  count: z.number().default(0),
});

const testData = { count: undefined };

const validatedTestData = NumberSchemaWithDefaultValue.parse(testData);

say({ validatedTestData });
