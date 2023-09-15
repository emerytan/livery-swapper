const fs = require('node:fs')
const path = require('node:path')


const liveryFiles = [
    'Formula_USA_2023.xml',
    'Formula_USA_2023_10_Toronto.xml',
    'Formula_USA_2023_1_StPete.xml',
    'Formula_USA_2023_2_Texas.xml',
    'Formula_USA_2023_3_LongBeach.xml',
    'Formula_USA_2023_4_Barber.xml',
    'Formula_USA_2023_5_IndyRoad.xml',
    'Formula_USA_2023_6_Indy500.xml',
    'Formula_USA_2023_7_Detroit.xml',
    'Formula_USA_2023_8_RoadAmerica.xml',
    'Formula_USA_2023_9_MidOhio.xml',
    'formula_usa_2022.xml',
    'formula_usa_2022_dist.xml',
    'formula_usa_2023_dist.xml'
]


function checkPathAndFiles(srcPath) {
  const absolutePath = path.resolve(srcPath)

  if (!fs.existsSync(absolutePath)) {
    console.log(`absolute path did not resolve...
    ${absolutePath}`)
    return false
  }

  let allFilesExist = true

  liveryFiles.forEach(fileName => {
    const filePath = path.join(absolutePath, fileName)

    if (!fs.existsSync(filePath)) {
      console.log(`missing file: ${fileName}`)
      allFilesExist = false
    }
  })

  return allFilesExist
}


module.exports = checkPathAndFiles

/*
module.exports.checkFiles = function(srcPath) {
    let state = 0
    for (let index = 0; index < liveryFiles.length; index++) {
        try {
            fs.accessSync(path.join(srcPath, liveryFiles[index]))
            console.log('file exists')
            return true
          } catch (err) {
            if (err) return err 
          }
    }
}
*/
