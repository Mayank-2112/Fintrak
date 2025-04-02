import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    { props: { variant: 'primary' }, style: { fontSize: theme.typography.h5.fontSize, fontWeight: theme.typography.h5.fontWeight } },
    { props: { variant: 'secondary' }, style: { fontSize: theme.typography.body2.fontSize, fontWeight: theme.typography.body2.fontWeight } },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText variant="primary" x={left + width / 2} y={top + height / 2 - 10}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={top + height / 2 + 14}>
        {secondaryText}
      </StyledText>
    </>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)'];

export default function ChartUserByCountry() {
  const [categories, setCategories] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/purchase/getall`);
        const data = await res.json();
        if (res.ok) {
          const grouped = data.purchases.reduce((acc, purchase) => {
            acc[purchase.category] = (acc[purchase.category] || 0) + purchase.amount;
            return acc;
          }, {});

          const total = Object.values(grouped).reduce((sum, val) => sum + val, 0);
          setTotalAmount(Math.round(total / 1000));

          const formattedData = Object.entries(grouped).map(([category, value], index) => ({
            name: category,
            value: ((value / total) * 100).toFixed(2),
            color: colors[index % colors.length],
          }));

          setCategories(formattedData);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Expense Category
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data: categories.map(({ name, value }) => ({ label: name, value: parseFloat(value) })),
                innerRadius: 65,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{ legend: { hidden: true } }}
          >
            <PieCenterLabel primaryText={`${totalAmount.toLocaleString()}K`} secondaryText="Total" />
          </PieChart>
        </Box>
        {categories.map((category, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {category.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={parseFloat(category.value)}
                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: category.color } }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
