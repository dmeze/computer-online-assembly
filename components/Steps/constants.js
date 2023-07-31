import {
  CPU, Fan,
  GraphicCard,
  HDD,
  Motherboard,
  PCBody,
  PowerSupply,
  RAM
} from '@/components/Icons/Icons'

export const steps = [
  {
    title: 'Motherboard',
    key: 'motherboard',
    index: 0
  },
  {
    title: 'CPU',
    key: 'cpu',
    index: 1
  },
  {
    title: 'Graphic Card',
    key: 'gpu',
    index: 2
  },
  {
    title: 'RAM',
    key: 'ram',
    index: 3
  },
  {
    title: 'Storage',
    key: 'storage',
    index: 4
  },
  {
    title: 'Power Supply',
    key: 'powerSupply',
    index: 5
  },
  {
    title: 'Body',
    key: 'body',
    index: 6
  },
  {
    title: 'Fans',
    key: 'fans',
    index: 7
  }
]

export const mapStepToIcon = {
  cpu: <CPU />,
  motherboard: <Motherboard />,
  gpu: <GraphicCard />,
  ram: <RAM />,
  storage: <HDD />,
  powerSupply: <PowerSupply />,
  body: <PCBody />,
  fans: <Fan />
}

export const mapIndexToNextStep = {
  motherboard: 'cpu',
  cpu: 'gpu',
  gpu: 'ram',
  ram: 'storage',
  storage: 'powerSupply',
  powerSupply: 'body',
  body: 'fans',
  fans: ''
}

export const mapTypeToIndex = {
  motherboard: 0,
  cpu: 1,
  gpu: 2,
  ram: 3,
  storage: 4,
  powerSupply: 5,
  body: 6,
  fans: 7
}
