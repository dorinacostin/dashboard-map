import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// app
import styles from './LayerAccordion.styles';
import { Accordion, Chart, Overflow, TableCell, TableHead, TrafficLights, Translate } from 'components';
import * as utils from 'utils';
import config from 'config';

// mui
import { makeStyles, Table, TableBody, TableRow, Typography } from '@material-ui/core';

LayerAccordionView.propTypes = {
  groups: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
  statuses: PropTypes.shape({
    quoted: PropTypes.number,
    pending: PropTypes.number,
    declined: PropTypes.number,
  }).isRequired,
  handlers: PropTypes.shape({
    buildChartData: PropTypes.func.isRequired,
  }).isRequired,
};

export function LayerAccordionView({ groups, cols, statuses, handlers, nestedClasses }) {
  const classes = makeStyles(styles, { name: 'LayerAccordion' })();

  return (
    <div className={classnames(classes.root, nestedClasses.root)}>
      {groups.map(([key, layers]) => {
        return (
          <Accordion key={key} title={key} testid="layer-business-type">
            <Overflow>
              <Table size="small">
                <TableHead columns={cols} />

                <TableBody>
                  {layers.map((layer) => {
                    const currency = utils.layer.getCurrency(layer);
                    const markets = utils.layer.getMarkets(layer);
                    const marketsQuoted = utils.markets.getByStatusIds(markets, [statuses.quoted]);

                    const premiumByCurrency = utils.markets.getPremiumByCurrency(marketsQuoted, currency, false, false);

                    const hasMultiplePremiums = utils.markets.hasMultiplePremiums(marketsQuoted);
                    const written = utils.markets.getLineSize(marketsQuoted);
                    const signed = utils.markets.getLineSize(marketsQuoted, true);
                    const dataWritten = handlers.buildChartData(written || 0, 'placement.generic.written');
                    const dataSigned = handlers.buildChartData(signed || 0, 'placement.generic.signed');

                    return (
                      <TableRow key={`${layer.id}`}>
                        <TableCell>
                          <Typography variant="body2" className={classes.layers} data-testid="layer-name">
                            {utils.layer.getName(layer)}
                          </Typography>
                        </TableCell>

                        <TableCell center>
                          <Typography variant="body2" className={classes.layers} data-testid="layer-premium">
                            {hasMultiplePremiums || !currency ? (
                              utils.string.t('app.various')
                            ) : (
                              <Translate
                                label="format.currency"
                                options={{
                                  value: { number: premiumByCurrency[currency], currency, default: '-' },
                                }}
                              />
                            )}
                          </Typography>
                        </TableCell>

                        <TableCell relative>
                          <Chart
                            type="doughnut"
                            data={dataWritten}
                            options={config.ui.chart.doughnut}
                            width={30}
                            height={30}
                            tooltip={utils.string.t('format.percent', { value: { number: written, default: '-' } })}
                            nestedClasses={{ chart: classes.chart }}
                          />
                        </TableCell>

                        <TableCell relative>
                          <Chart
                            type="doughnut"
                            data={dataSigned}
                            options={config.ui.chart.doughnut}
                            width={30}
                            height={30}
                            tooltip={utils.string.t('format.percent', { value: { number: signed, default: '-' } })}
                            nestedClasses={{ chart: classes.chart }}
                          />
                        </TableCell>

                        <TableCell center>
                          {markets && markets.length > 0 && (
                            <TrafficLights
                              tooltip
                              green={utils.markets.getByStatusIds(markets, [statuses.quoted]).length}
                              yellow={utils.markets.getByStatusIds(markets, [statuses.pending]).length}
                              red={utils.markets.getByStatusIds(markets, [statuses.declined]).length}
                            />
                          )}
                          {(!markets || !markets.length > 0) && '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Overflow>
          </Accordion>
        );
      })}
    </div>
  );
}
