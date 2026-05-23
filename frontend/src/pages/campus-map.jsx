import { useMemo, useState } from 'react'
import { Building2, Layers, MapPinned, Navigation } from 'lucide-react'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { campusBlocks } from '../data/unihub-data'

function CampusMap() {
  const [selectedId, setSelectedId] = useState('B')
  const selectedBlock = useMemo(
    () => campusBlocks.find((block) => block.id === selectedId) || campusBlocks[0],
    [selectedId],
  )

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge variant="default">Mapa do campus</Badge>
          <h1 className="mt-3 text-3xl font-bold text-zinc-50">Localizacao academica</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Blocos, salas, andares e pontos importantes da universidade.
          </p>
        </div>
        <Button variant="outline">
          <Navigation size={16} />
          Rotas salvas
        </Button>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.7fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned size={18} className="text-indigo-300" />
              Campus principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(39,39,42,0.75)_0%,rgba(24,24,27,0.95)_45%,rgba(15,23,42,0.8)_100%)] p-4">
              <div className="absolute left-[6%] right-[6%] top-1/2 h-5 -translate-y-1/2 rounded-full border border-white/10 bg-zinc-900/90" />
              <div className="absolute bottom-[10%] left-1/2 top-[8%] w-5 -translate-x-1/2 rounded-full border border-white/10 bg-zinc-900/90" />

              {campusBlocks.map((block) => (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => setSelectedId(block.id)}
                  className={`absolute flex flex-col items-start justify-between rounded-2xl border p-4 text-left shadow-2xl transition-all duration-300 ${block.position} ${block.color} ${
                    selectedId === block.id
                      ? 'scale-[1.03] ring-2 ring-white/40'
                      : 'hover:scale-[1.02] hover:ring-1 hover:ring-white/20'
                  }`}
                >
                  <span className="text-lg font-bold">{block.name}</span>
                  <span className="text-xs opacity-80">{block.type}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card glow>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 size={18} className="text-emerald-300" />
                {selectedBlock.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-zinc-50">{selectedBlock.type}</p>
                <p className="mt-1 text-xs text-zinc-500">{selectedBlock.floorInfo}</p>
              </div>
              <div className="space-y-2">
                {selectedBlock.rooms.map((room) => (
                  <div key={room} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="text-sm text-zinc-300">{room}</span>
                    <Badge variant="neutral">Sala</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers size={18} className="text-amber-300" />
                Blocos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {campusBlocks.map((block) => (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => setSelectedId(block.id)}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    selectedId === block.id
                      ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-100'
                      : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'
                  }`}
                >
                  <span className="block text-sm font-semibold">{block.name}</span>
                  <span className="text-xs text-zinc-500">{block.type}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default CampusMap
