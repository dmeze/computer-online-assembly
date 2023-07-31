export const cpuFilters = {
  cores: ['1', '2', '3', '4', '6', '8', '10', '12', '14', '16', '24'],
  speed: ['3600Mgh', '3500Mgh', '3400Mgh', '5600Mgh', '3800Mgh', '2300Mgh', '3000Mgh'],
  manufacturer: ['Intel', 'AMD'],
  memory: ['24Mb', '20Mb', '16Mb', '32Mb', '64Mb', '8Mb', '6Mb', '36Mb'],
  power: ['150W', '124W', '65W', '170W', '125W', '60W'],
  quality: ['used', 'factory new'],
  interface: ['LGA1700', 'LGA1600', 's1150', 'LGA1200', 'AM4']
}

export const motherboardFilters = {
  manufacturer: ['ASUS', 'Gigabyte', 'MSI', 'ASRock'],
  quality: ['Used', 'Factory New'],
  interface: ['LGA1700', 'LGA1600', 's1150', 'LGA1200', 'AM4'],
  model: ['B660', 'B450', 'B85M', 'B560M'],
  size: ['ATX', 'mini-ATX', 'micro-ATX']
}

export const gpuFilters = {
  manufacturer: ['ASUS', 'Gigabyte', 'MSI'],
  quality: ['Used', 'Factory New'],
  interface: ['PCI-E 4.0', 'PCI-E 3.0'],
  model: ['RTX 40', 'RTX 3050 TI', 'rtx 3050'],
  memory: ['24gb', '8gb', '6gb'],
  power: ['350W', '450W'],
  speed: ['2535Mgh', '2035Mgh']
}

export const ramFilters = {
  manufacturer: ['Kingston', 'Corsair', 'Goodram'],
  quality: ['Used', 'Factory New'],
  interface: ['DDR5', 'DDR4'],
  model: ['Fury Beast', 'Vengeance', 'IRDM X'],
  memory: ['32gb', '16gb', '8gb'],
  speed: ['3200Mgh', '5200Mgh', '2700Mgh', '2666Mgh'],
  size: ['DIMM']
}

export const storageFilters = {
  manufacturer: ['ADATA', 'Kingston', 'Samsung'],
  quality: ['Used', 'Factory New'],
  interface: ['PCI-E 3.0', 'PCI-E 4.0', 'SATA'],
  model: ['M.2 2280', '870 QVO'],
  memory: ['2tb', '1tb'],
  speed: ['3000-3500Mb/s', '2100-3500Mb/s', '530-560Mb/s'],
  size: ['M2', '2.5']
}

export const powerSupplyFilters = {
  manufacturer: ['Be Quiet!', 'Aerocool', 'Chieftec'],
  quality: ['Used', 'Factory New'],
  model: ['11 1000W', 'VX Plus 700W', 'CTG-750C'],
  power: ['1000W', '700W', '750W'],
  size: ['ATX']
}

export const bodyFilters = {
  manufacturer: ['Be Quiet!', 'DeepCool', '2E'],
  quality: ['Used', 'Factory New'],
  model: ['Pure Base 500DX', 'Matrexx 55', 'Gaming Sper'],
  size: ['ATX']
}

export const fansFilters = {
  manufacturer: ['Be Quiet!', 'Zezzio', 'QUBE'],
  quality: ['Used', 'Factory New'],
  model: ['Be Quiet! Pure Loop + 3 Pure Wings', 'ZC-120 SRGB', 'QB-OLWC360C'],
  size: ['ATX']
}

export const queryToFilters = {
  cpu: cpuFilters,
  motherboard: motherboardFilters,
  gpu: gpuFilters,
  ram: ramFilters,
  storage: storageFilters,
  powerSupply: powerSupplyFilters,
  body: bodyFilters,
  fans: fansFilters
}
