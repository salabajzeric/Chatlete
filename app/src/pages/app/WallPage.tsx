export default function WallPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            T
          </div>

          <div className="flex-1 space-y-3">
            <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              Share your training update... Use @ to mention users or groups
            </div>

            <div className="flex justify-end">
              <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            SL
          </div>

          <div>
            <p className="text-sm font-semibold">Sarah Lee</p>
            <p className="text-xs text-muted-foreground">@sarah_yoga · Yoga · 19 days ago</p>
          </div>
        </div>

        <p className="text-sm text-foreground">
          Yoga flow at sunrise was exactly what I needed. Namaste!
        </p>
      </div>
    </div>
  )
}