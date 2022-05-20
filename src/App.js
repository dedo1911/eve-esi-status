import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Alert,
  Badge,
  Divider,
  Container,
  Group,
  Button,
  Title,
  Paper,
  Text,
  Loader
} from '@mantine/core'
import {
  AlertCircle,
  CircleCheck,
  AlertTriangle
} from 'tabler-icons-react'

function App() {
  const [showGreen, setShowGreen] = useState(true)
  const [showYellow, setShowYellow] = useState(true)
  const [showRed, setShowRed] = useState(true)
  const { isLoading, error, data, dataUpdatedAt } = useQuery(
    'esiStatus',
    () => fetch('https://esi.evetech.net/status.json?version=latest')
      .then(res => res.json()),
      {
        retry: true,
        refetchInterval: 1E3 * 60
      })

  return <Container size='md'>
    <Title align='center' order={1}>
       EVE Online &middot; ESI Status
    </Title>
    { isLoading && <Text align='center'>
      <Loader size="xl" variant="bars" />
    </Text> }
    { error && <Alert icon={<AlertCircle size={16} />} title='Error' color='red'>
        An error occurred while fetching the ESI status.
      </Alert> }
    { data && <Paper shadow='xl' p='md' m='lg'>
      <Text align='center'><strong>Total Endpoints:</strong> { data.length }</Text>
      <Group position='center' spacing='md'>
        {
          data.filter(e => e.status === 'green').length > 0 &&
            <Text align='center' color='green'>
              <CircleCheck size={16} /> <strong>Online Endpoints:</strong> { data.filter(e => e.status === 'green').length }
            </Text>
        }
        {
          data.filter(e => e.status === 'yellow').length > 0 &&
            <Text align='center' color='yellow'>
              <AlertCircle size={16} /> <strong>Degraded Endpoints:</strong> { data.filter(e => e.status === 'yellow').length }
            </Text>
        }
        {
          data.filter(e => e.status === 'red').length > 0 &&
            <Text align='center' color='red'>
              <AlertCircle size={16} /> <strong>Offline Endpoints:</strong> { data.filter(e => e.status === 'red').length }
            </Text>
        }
      </Group>        
      <Text align='center' size='sm' color='dimmed'>Updated at: {new Date(dataUpdatedAt).toLocaleString()}</Text>
    </Paper> }
    { data &&  <Group position="center" spacing="xs">
      <Button color='green' variant={showGreen ? 'filled' : 'outline'} onClick={() => setShowGreen(!showGreen)}>
        Online
      </Button>
      <Button color='yellow' variant={showYellow ? 'filled' : 'outline'} onClick={() => setShowYellow(!showYellow)}>
        Degraded
      </Button>
      <Button color='red' variant={showRed ? 'filled' : 'outline'} onClick={() => setShowRed(!showRed)}>
        Offline
      </Button>
    </Group>}
    { data && data.map((x, i) => {
      let icon
      const color  = x.status
      if (x.status === 'green') {
        if (!showGreen) return null
        icon = <CircleCheck size={16} />
      }
      if (x.status === 'yellow') {
        if (!showYellow) return null
        icon = <AlertTriangle size={16} />
      }
      if (x.status === 'red') {
        if (!showRed) return null
        icon = <AlertCircle size={16} />
      }
      return <Alert key={i} icon={icon} title={x.endpoint} color={color} m='sm'>
        <Text>{x.method.toUpperCase()} {x.route}</Text>
        <Text align='right'>{ x.tags.map((tag, k) => <Badge color={color} key={k}>{tag}</Badge>) }</Text>
      </Alert>
    })}
    <Divider my='sm' />
    <Text align='center' size='xs' color='gray'>
      All Eve Related Materials are Property Of CCP Games
    </Text>
  </Container>
}

export default App
