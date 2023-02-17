import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Img = styled.img`
  width: 320px;
  margin: 1rem;
  box-shadow: 0px 5px 15px -2px rgba(0, 0, 0, 0.33);
`

export default function ImgSwitcher() {
  const [images, setImages] = useState([
    'https://arweave.net/-9Vc-T5nl-1xQIqd6bNyDQc9bjDlo9sIPt4TN7tqyxY',
    'https://arweave.net/EU4azs6OZVCmfGp_kSrMHE-uHoHwGsjnm0PTtXESTDs',
    'https://arweave.net/V2VWez_3fG8FAmW77gHT7bXOUa2ZiVyomGr3R6zkgSo',
    'https://arweave.net/Hq1vtDPFZkB7JSHUABx5Qh41seWM28M1AiY6ZFK9sUE',
    'https://arweave.net/gXTfn0pVmhJ28PmY8Zo24FNfBOrIGi58S4q4LpkYQ1U',
    'https://arweave.net/R-1SKXRlOXPlIgjfLeYF_qSK_Hf9qqYlBnPGuMTWcZo',
    'https://arweave.net/ZQRm3HJhaDS6doumm5bJVWPBgzXhaa4_I_neIQ5SmDc',
    'https://arweave.net/cCfHxXQHfIKCm4AnbX_vAg7WrDb4ru-oLQivEdgNw5o',
    'https://arweave.net/D3kVRKXX3A-gBRH21WTXz1AjKTF47DdEuj6XEAiFkHo',
    'https://arweave.net/EQbMjZV_JRmDaznUTQUMIM14O9PZEAZUkWjP60Dg8yM',
    'https://arweave.net/tz-9OkBq71PJx6i4ax9M_63x_nTBHGJ0Jkln6BLDw2w',
    'https://arweave.net/4fFMqkCWTCITlmbXYlV_CmpFFCqmJozqIjvjndR1omg',
    'https://arweave.net/GDbq9-sHi37RjCwdH1qkSsrYsIz-4j5K3SsD7cLDypk',
    'https://arweave.net/bMdjaSn3XD6NRqY22f7P0zJmWlyuDvdd5A440gZLtaU',
    'https://arweave.net/GpydADHvcWMCst5Dc_6prKWVFtAPga0zmQdNzgX0cfY',
    'https://arweave.net/T2ct4BmBxdbUr7qCL1yl4yNX9LX3yFEtHsrwIGcdbC8',
    'https://arweave.net/igz_Vh2COWUq9Y8X1efJXFQk4sr2b96snoKa3Tzl4Ws',
    'https://arweave.net/VW4wNoNBysSNiOnIccb5gpt-ayq0zbg83ajTpSrad9Q',
    'https://arweave.net/kufp1hO43Y0X5JxayZ4evtxJshwPb8t1FA_Li0uAoAk',
    'https://arweave.net/PFkbEMhItHo6BaemXKZTSBuTB_EL-ZmKFwNoC8nu21M',
    'https://arweave.net/0yDefEtU5pHyd27rrEUVucC97o24S3de6TYS0xTE2dg'
  ])
  const [currentImg, setCurrentImg] = useState(
    'https://arweave.net/gXTfn0pVmhJ28PmY8Zo24FNfBOrIGi58S4q4LpkYQ1U'
  )
  useEffect(() => {
    const interv = setInterval(() => {
      const newImg = images.shift()
      setCurrentImg(newImg!)
      setImages([...images.filter((i) => i !== newImg), newImg!])
    }, 333)

    return () => clearInterval(interv)
  }, [images])

  return <Img src={currentImg} style={{ maxWidth: '100%' }} />
}
