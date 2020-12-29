import moment from 'moment';

function weeklyData(dataset) {
  let count = 0;
  let end = dataset[dataset.length - 1].date;

  return dataset.reduceRight((newDataset, value) => {
    let day = moment(value.date).isoWeekday();

    if (day === 7) {
      count = 0;
      end = value.date;
    }

    if (day >= 1) {
      count += value.confirmed;
    }

    if (day === 1 && newDataset.length <= 52) {
      newDataset = [
        ...newDataset,
        {
          count,
          week: moment(value.date).isoWeek(),
          start: value.date,
          end,
        },
      ];
    }

    return newDataset;
  }, []);
}

export { weeklyData };
