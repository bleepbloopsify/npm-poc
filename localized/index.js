export var native = undefined;

try {
  native = await import("darwin");
} catch {}
try {
  native = await import("linux");
} catch {}

if (native === undefined) {
  native = {
    canary: "fallback",
  };
}
