export const canary = 1337;

export var native = undefined;

try {
  native = await import("@bbsify/npm-poc-darwin");
} catch {}

try {
  native = await import("@bbsify/npm-poc-linux");
} catch {}

if (native === undefined) {
  native = {
    canary: "fallback",
  };
}
