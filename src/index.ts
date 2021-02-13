#!/usr/bin/env node

import { StartGeneration } from './modules/main-module'

StartGeneration()
  .then((total: number) => {
    console.log(`Finished. Generated ${total} keys`)
  })
