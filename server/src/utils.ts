// Production list
export const allowedNewsletterUsers = [
  // sigle.btc
  'SP2EVYKET55QH40RAZE5PVZ363QX0X6BSRP4C7H0W',
  // leopradel.btc
  'SP3VCX5NFQ8VCHFS9M6N40ZJNVTRT4HZ62WFH5C4Q',
  // quentin.btc
  'SP24GYRG3M7T0S6FZE9RVVP9PNNZQJQ614650G590',
  // Test account
  'SPRG63HF7QJJ8H7JN0DJQZH2P1FCGYVHPYBXMYGB',
  // jackbinswitch.btc
  'SPQE3J7XMMK0DN0BWJZHGE6B05VDYQRXRMDV734D',
  // whenindoubt.btc
  'SP398XE371G08T84A99TCBD8XKWY3S7VVX6JKJWKY',
  // nftclothingclub.btc
  'SP2ABRYMZ38D5BHDMWPX6V0PKYA733W2T755DKQ72',
  // stxldn.btc
  'SPCMGSQF3ME39XN7W6RV4M21HFRHC2BGJH6S07V7',
  // bigrpic.btc
  'SP2H6HVZK6X3Z8F4PKF284AZJR6FH4H9J4W6KVV8T',
  // morguf.btc
  'SP21CYC2GKWTVK3FHFF4VVJNKVNQDMRY5GQS27XQB',
  // friedger.btc
  'SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X',
  // johnd.btc
  'SP14W78Q821B3HQ3ED30624Z1F13X4JMFZY3N5SK4',
  // behindthescenes.btc
  'SP1MX63HP0YD1TFAR0J6N6VYN3KVED5AF5JHPH1B7',
  // wampastompa.btc
  'SP22W7TM6NG3PJ2XVVND2E06D50K3DDNREBTKGFD3',
];
if (process.env.NODE_ENV === 'development') {
  // gregogun.btc
  allowedNewsletterUsers.push('SP1F48HCD4SP4HT8BHQPXZ35615764KC80ACNMBDZ');
}

export const generateAvatar = (stxAddress: string) => {
  return `https://source.boringavatars.com/marble/120/${stxAddress}?square&colors=da3a00,fa8158,ffa835,37c391,7c456cf`;
};
