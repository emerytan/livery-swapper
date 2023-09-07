const fs = require('node:fs')
const path = require('node:path')

let ams2path = 'F:/SteamLibrary/steamapps/common/Automobilista 2'
let overridePath = './Vehicles/Textures/CustomLiveries/Overrides/formula_usa_2023'

let fullPath = path.join(ams2path, overridePath)

console.log(fullPath)

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




