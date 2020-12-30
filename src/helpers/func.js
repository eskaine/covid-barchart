import moment from 'moment';

function weeklyData(dataset) {
  let total = 0;
  let count = 0;
  let end = dataset[dataset.length - 1].date;

  return dataset.reduce((newDataset, value) => {
    let day = moment(value.date).isoWeekday();

    if (day === 7) {
      count = 0;
      total = value.confirmed;
      end = value.date;
    }

    if (day >= 1) {
      count += value.new_confirmed;
    }

    if (day === 1 && newDataset.length <= 52) {
      newDataset = [
        {
          total,
          count,
          week: moment(value.date).isoWeek(),
          start: value.date,
          end,
        },
        ...newDataset,
      ];
    }

    return newDataset;
  }, []);
}

export { weeklyData };
