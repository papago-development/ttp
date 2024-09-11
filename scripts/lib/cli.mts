export const execute = async (fn: () => void | Promise<void>) => {
  try {
    await fn();
  } catch (error: any) {
    console.error(error.stack ? error.stack : String(error));
    process.exit(1);
  }
};
