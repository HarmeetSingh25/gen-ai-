export const buildPrompt = ({
   internetContext
}) => {

   return `
Realtime web data:

${internetContext}
`;
};