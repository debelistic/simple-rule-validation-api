exports.Validate = (req, res) => {
  try {
    const { rule, data } = req.body;

    if (!rule || !data) {
      let message = '';
      if (!rule) message = 'rule is required.';
      if (!data) message = 'data is required.';
      if (!rule && !data) message = 'rule and data are required.';
      return res.status(400).send({ message, status: 'error', data: null });
    }

    let fieldProps = rule.field.split('.');
    if (typeof rule !== 'object') {
      return res.status(400).send({ message: 'rule should be an object.', status: 'error', data: null });
    }

    if (typeof data !== 'object' && typeof data !== 'string') {
      return res.status(400).send({ message: 'data should be an object or string.', status: 'error', data: null });
    }

    if (fieldProps.length > 1 && !data[fieldProps[0]]) {
      return res.status(400).send({
        message: `field ${fieldProps[0]} is missing from data.`,
        status: 'error',
        data: null,
      });
    }
    if (fieldProps.length > 1 && data[fieldProps[0]] && !data[fieldProps[0]][fieldProps[1]]) {
      return res.status(400).send({
        message: `field ${rule.field} is missing from data.`,
        status: 'error',
        data: null,
      });
    }

    if (!data[rule.field] && !(rule.field.includes('.'))) {
      let message = '';
      fieldProps = rule.field.split('.');
      if (!data[fieldProps[0]]) {
        message = `field ${fieldProps[0]} is missing from data.`;
      } else {
        message = `field ${rule.field} is missing from data.`;
      }

      return res.status(400).send({
        message,
        status: 'error',
        data: null,
      });
    }
    if (typeof data[rule.field] === 'object' && !(data[fieldProps[0]])) {
      return res.status(400).send({
        message: `field ${rule.field} is missing from data.`,
        status: 'error',
        data: null,
      });
    }
    switch (rule.condition) {
      case 'eq':
        if (data[rule.field] === rule.condition_value
          || data[fieldProps[0]][fieldProps[1]] === rule.condition_value) {
          return res.status(200).send({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: rule.field,
                field_value: data[rule.field],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.status(400).send({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      case 'nq':
        if (data[rule.field] !== rule.condition_value
          || data[fieldProps[0]][fieldProps[1]] !== rule.condition_value) {
          return res.status(200).send({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: rule.field,
                field_value: data[rule.field],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.status(400).send({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      case 'gt':
        if (data[rule.field] > rule.condition_value
          || data[fieldProps[0]][fieldProps[1]] > rule.condition_value) {
          return res.status(200).send({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: rule.field,
                field_value: data[rule.field],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.status(400).send({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      case 'gte':
        if (data[rule.field] >= rule.condition_value
          || data[fieldProps[0]][fieldProps[1]] >= rule.condition_value) {
          return res.status(200).send({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: rule.field,
                field_value: data[rule.field],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.status(400).send({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });

      case 'contains':
        if (data[rule.field].includes(rule.condition_value)
        || data[fieldProps[0]][fieldProps[1]].includes(rule.condition_value)) {
          return res.status(200).send({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: rule.field,
                field_value: data[rule.field],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.status(400).send({
          message: `field ${rule.field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data[rule.field],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });

      default:
        return res.status(200).send({
          message: 'field [name of field] successfully validated.',
          status: 'success',
          data: {
            validation: {
              error: false,
              field: '[name of field]',
              field_value: ['value of field'],
              condition: '[rule condition]',
              condition_value: ['condition value'],
            },
          },
        });
    }
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};
