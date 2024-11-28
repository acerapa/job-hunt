import { argv } from 'node:process'
import { readdirSync } from 'node:fs'
import { dirname } from 'node:path'

const currentDir = dirname(__filename)
const files = readdirSync(currentDir)

const seeders = files.filter((file) => file.endsWith('.seeder.ts'))

const args = argv.slice(2)

const yellow = '\x1b[33m'
const green = '\x1b[32m'
const reset = '\x1b[0m'

const runSeeds = async (seeds: string[]) => {
  seeds.forEach(async (seed: string) => {
    try {
      const md = await import(`${currentDir}/${seed}`)
      console.log(`${green}${seed} is running!${green} ${reset}`)
      await md.run()
    } catch {
      // console must have color yellow
      console.warn(`${yellow} ${seed} is not found! ${yellow} ${reset}`)
    }
  })
}

if (args.length) {
  args.forEach(async (arg) => {
    if (arg == '--seed-all') {
      await runSeeds(seeders)
    } else if (arg.startsWith('--seed=')) {
      const seedStr = arg.replace('--seed=', '')
      const seeds = seedStr.split(',').filter((seed) => seed)
      await runSeeds(seeds)
    } else {
      console.warn(`${yellow}Expected --seed-all or --seed=${yellow} ${reset}`)
    }
  })
} else {
  console.warn(`${yellow}Expected --seed-all or --seed=${yellow} ${reset}`)
}
