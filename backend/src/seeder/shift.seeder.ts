import { instanceToPlain } from 'class-transformer'
import { Shift } from '../entities/Shift'
import { type Shift as IShift } from '@shared/pack/dist'

const defaultShifts: IShift[] = [
  {
    name: 'Morning',
    start_time: '06:00',
    is_default: true,
    end_time: '14:00'
  },
  {
    name: 'Day',
    start_time: '08:00',
    is_default: true,
    end_time: '16:00'
  },
  {
    name: 'Afternoon',
    start_time: '15:00',
    is_default: true,
    end_time: '00:00'
  },
  {
    name: 'Night',
    start_time: '00:00',
    is_default: true,
    end_time: '08:00'
  }
]

export const run = async () => {
  const shifts = Shift.create(instanceToPlain(defaultShifts))
  await shifts.save()

  console.log('Seeded shifts')
}
