# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT RSI_LEN = 14;
INPUT RSIMA_LEN = 12;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

# RSI
DEF NETCHGAVG = WILDERSAVERAGE(CLOSE - CLOSE[1], RSI_LEN);
DEF TOTCHGAVG = WILDERSAVERAGE(ABSVALUE(CLOSE - CLOSE[1]), RSI_LEN);
DEF CHGRATIO = IF TOTCHGAVG != 0 THEN NETCHGAVG / TOTCHGAVG ELSE 0;
DEF RSI = ROUND(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 1);
DEF RSISMA = ROUND(SIMPLEMOVINGAVG(PRICE = RSI, LENGTH = RSIMA_LEN),1);

# TEST
DEF GREENPRICE = FASTLINE >= SLOWLINE AND RSI >= RSISMA;
DEF REDPRICE = FASTLINE < SLOWLINE AND RSI < RSISMA;

plot RATING =

if
GREENPRICE
AND CLOSE >= HIGHEST(HIGH[1], 2)
AND LOWEST(FASTLINE, 3) <= 20
AND RSISMA <= 50
then RSI-RSI[1]

else if
FASTLINE <= SLOWLINE
AND CLOSE <= LOWEST(LOW[1], 2)
AND HIGHEST(FASTLINE, 3) >= 80
AND RSISMA >= 50
then RSI-RSI[1]

else 0;