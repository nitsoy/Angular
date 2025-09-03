import { Pipe, PipeTransform } from '@angular/core';

const USER_NAME_MAP: Record<number, string> = {
  1: 'Elisa',
  2: 'Raquel',
  3: 'Ignacio',
  4: 'Nieves',
  5: 'Úrsula',
  6: 'Álberto',
  7: 'Sofía',
  8: 'Andrés',
  9: 'Elena',
  10: 'Óscar',
};

@Pipe({
  name: 'userName',
  pure: true,
})
export class UserNamePipe implements PipeTransform {
  transform(id: number | null | undefined): string {
    if (id == null) return '';
    return USER_NAME_MAP[id] ?? `Usuario ${id}`;
  }
}
