// Lib/somefile.ts
import { deepmergeCustom } from 'deepmerge-ts'

const deepmerge = deepmergeCustom({
  mergeArrays: false,
  mergeOthers(values, utils) {
    return utils.defaultMergeFunctions.mergeOthers(values.filter(value => value !== undefined))
  },
})

export const DeepObjectMerge = <Ts extends T[], T extends Record<string, any>>(...objects: Ts) => deepmerge(...objects)

/**
 * Deep Object Plain Merge is for merging plain objects without merging methods,
 * beware if you want to merge the class properties, use DeepObjectMerge instead
 * @param objects
 * @returns
 */
export const DeepObjectPlainMerge = <Ts extends T[], T extends Record<string, any>>(...objects: Ts) => {
  const plainObjects = objects.map(object => ({ ...object })) as Ts
  return deepmerge(...plainObjects)
}
